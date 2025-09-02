exports.paymentEmailTemplate = (name, amount, transactionId) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Payment Confirmation</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your payment of ₹${amount}/- towards your hospital bill.</p>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p>If you have any questions, feel free to contact our billing department.</p>
      <br/>
      <p>Regards,<br>Hospital Management</p>
    </div>
  `;
};
