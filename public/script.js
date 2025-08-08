document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const sender = document.getElementById("sender").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("http://localhost:3000/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, message }),
    });
    const data = await response.json();
    document.getElementById(
      "response"
    ).innerText = `Pesan berhasil dikirim! ID: ${data.id}`;
  } catch (error) {
    console.error("Error:", error);
  }
});
