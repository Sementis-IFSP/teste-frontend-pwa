document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const emailDigitado = document.getElementById('loginEmail').value;
            const senhaDigitada = document.getElementById('loginPassword').value;

            try {
                // ATENÇÃO: Mesmo link do Ngrok, mas agora terminando em /login
                // Lembre-se de atualizar esse link toda vez que o Ngrok gerar um novo!
                const urlDoServidor = "http://127.0.0.1:5000/login";

                const resposta = await fetch(urlDoServidor, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        email: emailDigitado, 
                        senha: senhaDigitada 
                    })
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert("Login realizado com sucesso! Bem-vindo de volta! 🌿");
                    
                    // Salva na gaveta os dados que o Lucas mandou (com moedas, xp, etc)
                    localStorage.setItem("user", JSON.stringify(resultado.usuario));
                    
                    // Manda pra Home
                    window.location.href = "index.html";
                } else {
                    alert("Erro: " + resultado.erro);
                }
            } catch (erro) {
                alert("Erro de conexão! O servidor está ligado?");
                console.error(erro);
            }
        });
    }
});