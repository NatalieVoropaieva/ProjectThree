import './Quiz.scss';
import Layout from "./Layout";
import {useEffect, useState} from "react";
const mockedQuestions = [
    {
        question: "Kratos is the main character of what video game series? ",
        correctId: 1,
        answers: [
            {
                id: 1,
                answer: "God of War"
            },
            {
                id: 2,
                answer: "Sims 4"
            },
            {
                id: 3,
                answer: "Cyberpunk 2077"
            },
            {
                id: 4,
                answer: "Fifa 2022"
            }
        ]
    },
    {
        question: "What is the most common surname in the United States?",
        correctId: 2,
        answers: [
            {
                id: 1,
                answer: "Petrow"
            },
            {
                id: 2,
                answer: "Smith"
            },
            {
                id: 3,
                answer: "Doe"
            },
            {
                id: 4,
                answer: "Brown"
            }
        ]
    },
    {
        question: "How many faces does a Dodecahedron have?",
        correctId: 3,
        answers: [
            {
                id: 1,
                answer: "20"
            },
            {
                id: 2,
                answer: "16"
            },
            {
                id: 3,
                answer: "12"
            },
            {
                id: 4,
                answer: "10"
            }
        ]
    },
    {
        question: "What game studio makes the Red Dead Redemption series?",
        correctId: 4,
        answers: [
            {
                id: 1,
                answer: "CD Project Red"
            },
            {
                id: 2,
                answer: "Blizzard"
            },
            {
                id: 3,
                answer: "EA"
            },
            {
                id: 4,
                answer: "Rockstar Games"
            }
        ]
    },
    {
        question: "What character has both Robert Downey Jr. and Benedict Camamberch played?",
        correctId: 2,
        answers: [
            {
                id: 1,
                answer: "Dr. Doolitle"
            },
            {
                id: 2,
                answer: "Sherlock Holmes"
            },
            {
                id: 3,
                answer: "IronMan"
            },
            {
                id: 4,
                answer: "Dr. Strange"
            }
        ]
    },
    {
        question: "What city is known as \"The Eternal City\"?",
        correctId: 1,
        answers: [
            {
                id: 1,
                answer: "Rome"
            },
            {
                id: 2,
                answer: "Paris"
            },
            {
                id: 3,
                answer: "Vinnytsia"
            },
            {
                id: 4,
                answer: "Chernivtsy"
            }
        ]
    },
];
const Quiz = () =>{
    const [questions, setQuestions] = useState(mockedQuestions);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [stage, setStage] = useState(0);
    const [isTimer, setIsTimer] = useState(false);

    useEffect(() => {
        setIsTimer(false)
        const timeout =  setTimeout(() => {
            setIsTimer(true)
        }, 100)
        return () => {
            clearTimeout(timeout);
        };
    }, [currentQuestion, stage]);

    useEffect(() => {
        let timeout = null;
        if(stage === 1) {
            timeout = setTimeout(() => {
                getNextQuestion();
            }, 20000)
        }
       return () => {
           clearTimeout(timeout);
       };
    });

    const getNextQuestion = () => {
        const newQuestion = currentQuestion + 1;
        if (newQuestion === questions.length) {
            setStage(2);
        } else {
            setCurrentQuestion(newQuestion);
        }
    }

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            const newScore = score + 1;
            setScore(newScore);
        }
        getNextQuestion();
    }
    const reset = () => {
        setStage(0);
        setCurrentQuestion(0);
        setScore(0);
    }
    const question = questions[currentQuestion];
    const classes = `timer ${isTimer && stage === 1 ? 'active': ''}`
    return(
        <Layout>
            {stage === 0 && <div className='quiz-container'><button onClick={() => setStage(1)} className='quiz-btn'>Start</button></div>}
            {stage === 1 && (
                <div>
                    <div className='quiz-container'>
                        <div className={classes}>
                        </div>
                        <div className='progress'>Progress: {currentQuestion + 1} / {questions.length}</div>
                        <Question question={question} handleAnswer={handleAnswer}/>
                    </div>

                </div>
            )}
            {stage === 2 && <div className='quiz-container'><div className='score'>Your Score: {score}</div><button onClick={reset} className='quiz-btn'>Try again</button></div>}
        </Layout>
    );
}
const Question = ({question, handleAnswer}) => {
    return(
        <div>
            <div className='question-container'>{question.question}</div>
            <div className='answer-container'>
                {question.answers.map(answer => {
                    return <div key={answer.id} onClick={() => handleAnswer(answer.id === question.correctId)} className='answer'>
                        {answer.answer}
                    </div>
                })}
            </div>
        </div>
    )
}
export default Quiz;