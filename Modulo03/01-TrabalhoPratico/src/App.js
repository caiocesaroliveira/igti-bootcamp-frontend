import React, { useState } from 'react'

// import css from './app.module.css';

const allGrades = [
  {
    id: 1,
    descricao: 'Módulo 01 - Fundamentos (0 -100)',
    nome: 'nota1',
    nota: '',
  },
  {
    id: 2,
    descricao: 'Módulo 02 - Angular (0 -100)',
    nome: 'nota2',
    nota: '',
  },
  {
    id: 3,
    descricao: 'Módulo 03 - React (0 -100)',
    nome: 'nota3',
    nota: '',
  },
  {
    id: 4,
    descricao: 'Módulo 04 - Vue (0 -100)',
    nome: 'nota4',
    nota: '',
  },
  {
    id: 5,
    descricao: 'Módulo 05 - Desafio Final (0 -100)',
    nome: 'nota5',
    nota: '',
  },
]

export const App = () => {
  const [grades, setGrades] = useState(allGrades)

  const handleChange = (id, novaNota) => {
    const novasNotas = [...grades]
    novasNotas.find(g => g.id === id).nota = parseInt(novaNota, 10)
    setGrades(novasNotas)
  }

  const sum = grades.reduce((acc, { nota }) => acc + nota, 0)
  const average = sum / grades.length
  const averageString = average.toFixed(2).replace('.', ',')
  const aprovacao = {
    media: grades.filter(g => g.nota < 60).length > 0 ? 'Não' : 'Sim',
    percentualTotal: average < 70 ? 'Não' : 'Sim',
  }
  const aprovacaoCor = {
    media: aprovacao.media === 'Não' ? 'negativo' : 'positivo',
    percentualTotal:
      aprovacao.percentualTotal === 'Não' ? 'negativo' : 'positivo',
  }
  return (
    <>
      <header className="center">
        <h1>Controle de notas do bootcamp IGTI com React</h1>
      </header>

      <div className="container">
        <div className="notas">
          <h4>Notas atuais</h4>
          {grades.map(grade => {
            return (
              <div className="row" key={grade.id}>
                <div className="input-field col s12">
                  <input
                    className="validate"
                    type="number"
                    id={grade.nome}
                    value={grade.nota}
                    min="0"
                    max="100"
                    onChange={({ target }) =>
                      handleChange(grade.id, target.value)
                    }
                  />
                  <label className="active" htmlFor={grade.nome}>
                    {grade.descricao}
                  </label>
                </div>
              </div>
            )
          })}
        </div>

        <div className="calculos">
          <h4>Cálculos</h4>

          <div className="resumo">
            <div>
              <strong>Nota total:</strong> <span> {sum}</span>
            </div>

            <div>
              <strong>Percentual total:</strong> <span> {averageString} %</span>
            </div>

            <div>
              <strong>
                Aprovacao pela média (60%)?{' '}
                <span className={aprovacaoCor.media}> {aprovacao.media}</span>
              </strong>
            </div>

            <div>
              <strong>
                Aprovacao pelo percentual total (70%)?
                <span className={aprovacaoCor.percentualTotal}>
                  {' '}
                  {aprovacao.percentualTotal}
                </span>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
