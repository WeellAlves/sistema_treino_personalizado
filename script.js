document.getElementById('anamneseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Valores do formulário
    const genero = document.getElementById('genero').value;
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100;
    const hipertenso = document.getElementById('hipertenso').value;
    const sedentario = document.getElementById('sedentario').value;
    const tempoPratica = document.getElementById('tempoPratica').value;
    const nivelCondicionamento = document.getElementById('nivelCondicionamento').value;
    const objetivo = document.getElementById('objetivo').value;
    const diasDisponiveis = parseInt(document.getElementById('diasDisponiveis').value);

    // Calcular o IMC
    const imc = peso / (altura * altura);
    let imcClassificacao = '';
    
    if (imc < 18.5) {
        imcClassificacao = 'Baixo peso';
    } else if (imc < 25) {
        imcClassificacao = 'Normal';
    } else if (imc < 30) {
        imcClassificacao = 'Sobrepeso';
    } else {
        imcClassificacao = 'Obesidade';
    }

    // Seleciona o trino baseado na frequência
    let workoutPlan = '';
    let workoutTable = '';
    
    if (diasDisponiveis === 2 || diasDisponiveis === 3) {
        
        const exercises = getExercises(6, nivelCondicionamento, objetivo);
        workoutPlan = createWorkoutTable(exercises, diasDisponiveis);
    } else if (diasDisponiveis >= 4 && diasDisponiveis <= 7) {
        
        workoutPlan = '<h3>Plano de Treino Semanal</h3>';
        
        const workoutTypes = [
            { name: "Superiores (Peito/Tríceps)", focus: "upper_chest" },
            { name: "Inferiores (Pernas/Glúteos)", focus: "lower" },
            { name: "Costas/Bíceps", focus: "back" },
            { name: "Ombro/Abdômen", focus: "shoulders" },
            { name: "Full Body", focus: "full" },
            { name: "Cardio/Resistência", focus: "cardio" },
            { name: "Funcional/Flexibilidade", focus: "functional" }
        ];
        
        for (let day = 1; day <= diasDisponiveis; day++) {
            const exerciseCount = nivelCondicionamento === 'avancado' ? 7 : 6;
            const dayType = workoutTypes[(day-1) % workoutTypes.length];
            const exercises = getExercisesByFocus(exerciseCount, nivelCondicionamento, objetivo, dayType.focus);
            
            workoutPlan += `<h4>Dia ${day}: ${dayType.name}</h4>`;
            workoutPlan += createWorkoutTable(exercises, 1);
        }
    }

    // Dicas de saúde
    const healthTips = `
        <div class="tips">
            <h3>Dicas para Melhor Rendimento</h3>
            <ul>
                <li>Beba pelo menos 2 litros de água por dia</li>
                <li>Execute os exercícios com técnica correta para evitar lesões</li>
                <li>Mantenha uma alimentação balanceada com proteínas, carboidratos e gorduras saudáveis</li>
                <li>Descanse adequadamente entre os treinos</li>
                <li>Alongue-se após o treino para melhorar a flexibilidade</li>
                ${nivelCondicionamento === 'iniciante' ? '<li>Inicie com cargas leves e aumente gradualmente</li>' : ''}
                ${objetivo === 'perda_peso' ? '<li>Combine exercícios aeróbicos com musculação para melhores resultados</li>' : ''}
            </ul>
        </div>
    `;
    
    // Alerta quando o aluno(a) relatar ser hipertenso
    let warnings = '';
    if (hipertenso === 'sim') {
        warnings += `<div class="alert">⚠️ ATENÇÃO: Por ser hipertenso(a), consulte seu médico antes de iniciar qualquer treinamento físico e evite exercícios de alta intensidade.</div>`;
    }
    if (sedentario === 'sim') {
        warnings += `<div class="alert">⚠️ ATENÇÃO: Por ser sedentário(a), inicie com cargas leves e aumente gradualmente a intensidade dos exercícios.</div>`;
    }

    // Mostra o Resultado
    const resultado = `
        <h2>Seu Plano de Treino Personalizado</h2>
        <p><strong>IMC:</strong> ${imc.toFixed(2)} (${imcClassificacao})</p>
        ${warnings}
        ${workoutPlan}
        ${healthTips}
    `;

    document.getElementById('resultado').innerHTML = resultado;

    // Mostra a opção de imprimir o treino

    document.getElementById('btnImprimir').style.display = 'inline-block';
});


    

function getExercisesByFocus(count, level, goal, focus) {
    const exerciseLibrary = {
        upper_chest: [
            { name: "Supino Reto", sets: 4, reps: "8-12", rest: "90s" },
            { name: "Supino Inclinado", sets: 3, reps: "10-12", rest: "90s" },
            { name: "Crucifixo", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Tríceps Testa", sets: 3, reps: "10-12", rest: "60s" },
            { name: "Tríceps Corda", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Flexão de Braço", sets: 3, reps: "8-12", rest: "60s" }
        ],
        lower: [
            { name: "Agachamento Livre", sets: 4, reps: "8-12", rest: "90s" },
            { name: "Leg Press", sets: 3, reps: "10-12", rest: "90s" },
            { name: "Cadeira Extensora", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Mesa Flexora", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Elevação de Panturrilhas", sets: 4, reps: "15-20", rest: "60s" },
            { name: "Afundo", sets: 3, reps: "10 por perna", rest: "60s" }
        ],
        back: [
            { name: "Barra Fixa", sets: 3, reps: "Até a falha", rest: "90s" },
            { name: "Remada Curvada", sets: 4, reps: "8-12", rest: "90s" },
            { name: "Puxada Alta", sets: 3, reps: "10-12", rest: "60s" },
            { name: "Remada Baixa", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Rosca Direta", sets: 3, reps: "10-12", rest: "60s" },
            { name: "Rosca Martelo", sets: 3, reps: "12-15", rest: "60s" }
        ],
        shoulders: [
            { name: "Desenvolvimento Militar", sets: 4, reps: "8-12", rest: "90s" },
            { name: "Elevação Lateral", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Remada Alta", sets: 3, reps: "10-12", rest: "60s" },
            { name: "Encolhimento de Ombros", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Abdominal Supra", sets: 3, reps: "15-20", rest: "30s" },
            { name: "Prancha", sets: 3, reps: "30-60s", rest: "30s" }
        ],
        full: [
            { name: "Burpee", sets: 3, reps: "10-12", rest: "90s" },
            { name: "Agachamento com Salto", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Flexão de Braço", sets: 3, reps: "10-15", rest: "60s" },
            { name: "Puxada no TRX", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Abdominal Bicicleta", sets: 3, reps: "20", rest: "30s" },
            { name: "Corrida Estacionária", sets: 3, reps: "30s", rest: "30s" }
        ],
        cardio: [
            { name: "Esteira (HIIT)", sets: 1, reps: "20 min", rest: "-" },
            { name: "Bicicleta Ergométrica", sets: 1, reps: "20 min", rest: "-" },
            { name: "Corda Naval", sets: 3, reps: "1 min", rest: "30s" },
            { name: "Escalador", sets: 3, reps: "30s", rest: "30s" },
            { name: "Burpee", sets: 3, reps: "12", rest: "60s" }
        ],
        functional: [
            { name: "Prancha com Rotação", sets: 3, reps: "10 por lado", rest: "30s" },
            { name: "Agachamento com Kettlebell", sets: 3, reps: "12", rest: "60s" },
            { name: "Levantamento Terra", sets: 3, reps: "10-12", rest: "90s" },
            { name: "Flexão com Rotação", sets: 3, reps: "8 por lado", rest: "60s" },
            { name: "Alongamento Dinâmico", sets: 1, reps: "5 min", rest: "-" },
            { name: "Mobilidade de Ombro", sets: 3, reps: "10", rest: "30s" }
        ]
    };

    // Ajuste do Objetivo
    let exercises = exerciseLibrary[focus];
    
    if (goal === 'perda_peso') {
        exercises = exercises.map(ex => ({
            ...ex,
            reps: ex.reps.includes('min') ? ex.reps : parseInt(ex.reps.split('-')[0]) + 4 + '-' + (parseInt(ex.reps.split('-')[1]) + 6),
            rest: ex.rest === '90s' ? '60s' : ex.rest === '60s' ? '45s' : ex.rest
        }));
    } else if (goal === 'hipertrofia') {
        exercises = exercises.map(ex => ({
            ...ex,
            reps: ex.reps.includes('min') || ex.reps.includes('Até') ? ex.reps : "8-12",
            rest: ex.rest === '60s' ? '90s' : ex.rest
        }));
    }
    
    // Ajutes da Intensidade
    if (level === 'iniciante') {
        exercises = exercises.map(ex => ({
            ...ex,
            sets: Math.max(2, ex.sets - 1),
            reps: ex.reps.includes('min') ? ex.reps : "12-15",
            rest: "60s"
        }));
    } else if (level === 'avancado') {
        exercises = exercises.map(ex => ({
            ...ex,
            sets: ex.sets + 1,
            rest: ex.rest === '60s' ? '90s' : ex.rest
        }));
    }
    
    return exercises.slice(0, count);
}

function createWorkoutTable(exercises, days) {
    let table = `
        <table>
            <thead>
                <tr>
                    <th>Exercício</th>
                    <th>Séries</th>
                    <th>Repetições/Duração</th>
                    <th>Descanso</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    exercises.forEach(exercise => {
        table += `
            <tr>
                <td>${exercise.name}</td>
                <td>${exercise.sets}</td>
                <td>${exercise.reps}</td>
                <td>${exercise.rest}</td>
            </tr>
        `;
    });
    
    table += `
            </tbody>
        </table>
    
    `;
    
    return table;
}

    