import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const input = fs
  .readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'input.txt'),
    'utf-8',
  )
  .trim()
  .replace('\n\n', '#')
  .split('#')
  .map((line, i) =>
    i === 0
      ? line.split(',').map(Number)
      : line.split('\n\n').map(board =>
          board.split('\n').map(row =>
            row
              .split(' ')
              .filter(num => num !== '')
              .map(Number),
          ),
        ),
  )

const checkBoard = board =>
  board.some(
    (row, i, rows) =>
      row.every(num => num === 'X') || rows.every(row => row[i] === 'X'),
  )

const part1 = JSON.parse(JSON.stringify(input[0]))
  .reduce((acc, cur, _i, arr) => {
    const winner = acc.find(board => {
      board.forEach(row => {
        const index = row.indexOf(cur)
        if (index >= 0) row.splice(index, 1, 'X')
      })

      return checkBoard(board)
    })

    return winner ? (arr.splice(1), [cur, winner]) : acc
  }, input[1])
  .map((x, i) =>
    i === 0
      ? x
      : x.reduce(
          (acc, row) =>
            acc +
            row.filter(Number.isInteger).reduce((acc, num) => acc + num, 0),
          0,
        ),
  )
  .reduce((acc, cur) => acc * cur, 1)
console.log(part1)

const part2 = JSON.parse(JSON.stringify(input[0]))
  .reduce((acc, cur, _i, arr) => {
    const winners = acc.filter(board => {
      board.forEach(row => {
        const index = row.indexOf(cur)
        if (index >= 0) row.splice(index, 1, 'X')
      })

      return checkBoard(board)
    })

    return winners.length === 1 && acc.length === 1
      ? (arr.splice(1), [cur, winners[0]])
      : acc.filter(board => !winners.includes(board))
  }, input[1])
  .map((x, i) =>
    i === 0
      ? x
      : x.reduce(
          (acc, row) =>
            acc +
            row.filter(Number.isInteger).reduce((acc, num) => acc + num, 0),
          0,
        ),
  )
  .reduce((acc, cur) => acc * cur, 1)
console.log(part2)
