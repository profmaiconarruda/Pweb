        function play(playerChoice) {
            const choices = ['pedra', 'papel', 'tesoura'];
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            let result;

            if (playerChoice === computerChoice) {
                result = "Empate! Você e o computador escolheram " + computerChoice + ".";
            } else if (
                (playerChoice === 'pedra' && computerChoice === 'tesoura') ||
                (playerChoice === 'papel' && computerChoice === 'pedra') ||
                (playerChoice === 'tesoura' && computerChoice === 'papel')
            ) {
                result = "Você ganhou! " + playerChoice + " vence " + computerChoice + ".";
            } else {
                result = "Você perdeu! " + computerChoice + " vence " + playerChoice + ".";
            }

            document.getElementById('result').innerText = result;
        }