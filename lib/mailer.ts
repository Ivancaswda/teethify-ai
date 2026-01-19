import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export async function sendAppointmentEmail({
                                               to,
                                               doctorName,
                                               date,
                                               time,
                                               reason,
                                           }: {
    to: string;
    doctorName: string;
    date: string;
    time: string;
    reason?: string;
}) {

    console.log(to)
    console.log(doctorName)
    console.log(date)
    console.log(time)
    console.log(reason)
    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6">
    <h2>🦷 Запись на приём подтверждена</h2>

    <p>Здравствуйте!</p>

    <p>Ваша запись на приём успешно создана. Детали:</p>

    <ul>
      <li><b>Врач:</b> ${doctorName}</li>
      <li><b>Дата:</b> ${date}</li>
      <li><b>Время:</b> ${time}</li>
      <li><b>Адрес:</b> Teethify HQ - Ленина 2/3</li>
      ${reason ? `<li><b>Причина:</b> ${reason}</li>` : ""}
    </ul>

    <p>
      Если у вас появятся вопросы или потребуется отменить приём —
      пожалуйста, свяжитесь с клиникой.
    </p>

    <p style="margin-top: 24px">
      С заботой,<br/>
      <b>Teethify</b>
    </p>
  </div>
  `;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: "🦷 Подтверждение записи на приём",
        html,
    });
}
