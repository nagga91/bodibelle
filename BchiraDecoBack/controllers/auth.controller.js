const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Utilisateur introuvable' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Mot de passe incorrect' });

  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
  res.json({ token, user: { email: user.email, isAdmin: user.isAdmin } });
};

exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: 'Email déjà utilisé' });

  const newUser = new User({ email, password, isAdmin: true });
  await newUser.save();
  res.status(201).json({ msg: 'Admin créé' });
};
exports.Contact = async (req, res) => { 
    const { email, name, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:465,
      secure:true, 
      auth: {
        user: process.env.SMTP_CREDENTIAL_EMAIL,
        pass: process.env.SMTP_CREDENTIAL_PASS,
      }
    });
  
    var mailOptions = {
    
      to: process.env.EMAIL_RECEIVER,
      subject: "Message client",
      html:`
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9f9f9; padding: 0; margin: 0;">
        <div style="background: #fff; max-width: 600px; margin: 30px auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.07);">
          <div style="background: #F2F6D0; padding: 2rem 0; text-align: center;">
            <img src='https://i.ibb.co/FLScrqKk/Screenshot-2025-07-21-at-02-03-00.png' alt="Logo" style="height: 60px; margin-bottom: 10px;" />
            <h2 style="color: #947d53; margin: 0;">Nouveau message client</h2>
          </div>
          <div style="padding: 2rem; color: #2c3e50;">
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;"><strong>Client :</strong> ${name}</p>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #947d53; text-decoration: none;">${email}</a></p>
            <div style="background: #F2F6D0; border-left: 4px solid #947d53; padding: 1rem; border-radius: 6px; margin-bottom: 2rem;">
              <p style="font-size: 1.15rem; margin: 0; color: #2c3e50;"><strong>Message :</strong></p>
              <p style="font-size: 1.1rem; margin: 0; color: #2c3e50; white-space: pre-line;">${message}</p>
            </div>
          </div>
          <div style="background: #947d53; color: #fff; text-align: center; padding: 1rem 0;">
            <p style="margin: 0; font-size: 1rem;">© ${new Date().getFullYear()} Deco Bchira. Tous droits réservés.</p>
          </div>
        </div>
      </div>
      `,
    };
  
    const info = await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).send({message:error});
      } else {
        res.status(200).send({message:"successfully"});
      }
    });
  };
