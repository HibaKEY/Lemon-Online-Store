const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/Users"); // تأكد من المسار الصحيح

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Twilio credentials (دير المعطيات ديالك من Twilio console)
const accountSid = "ACxxxxxxxxxxxxxxxxxxxx";
const authToken = "your_auth_token";
const verifySid = "VAxxxxxxxxxxxxxxxxxxxx";
const client = twilio(accountSid, authToken);

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/lemonApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// 📩 إرسال كود التحقق عبر SMS
app.post("/send-code", async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phone, channel: "sms" });

    res.json({ status: verification.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send code" });
  }
});

// 🔍 التحقق من الكود
app.post("/verify-code", async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === "approved") {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid code" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
});

// 🔑 تحديث الباسوورد بعد التحقق
app.post("/reset-password", async (req, res) => {
  const { phone, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { phone },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating password" });
  }
});

app.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
