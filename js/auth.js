document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const emailDigitado = document.getElementById('loginEmail').value;
            const senhaDigitada = document.getElementById('loginPassword').value;

            try {
                // ATENÇÃO: Como o Python agora roda o site junto com a API, 
                // não precisamos mais colocar "http://0.0.0.127/...". Usamos apenas a rota!
                const urlDoServidor = "/login";

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

                    // 1. Salva a Chave de Segurança (O Token que o Lucas gerou)
                    localStorage.setItem("token", resultado.token);

                    // 2. Salva na gaveta os dados do usuário (com moedas, xp, vidas, etc)
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