import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const input = fs
  .readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'input.txt'),
    'utf-8',
  )
  .trim()
  .split('\n')
  .map(line => line.split(' '))
  .map(([dir, unit]) => [dir, Number(unit)])

const part1 = input
  .reduce(
    (acc, [dir, unit]) => (
      dir === 'forward'
        ? (acc[0] += unit)
        : dir === 'down'
        ? (acc[1] += unit)
        : (acc[1] -= unit),
      acc
    ),
    [0, 0],
  )
  .reduce((acc, cur) => acc * cur, 1)
console.log(part1)

const part2 = input
  .reduce(
    (acc, [dir, unit]) => (
      dir === 'forward'
        ? ((acc[0] += unit), (acc[1] += unit * acc[2]))
        : dir === 'down'
        ? (acc[2] += unit)
        : (acc[2] -= unit),
      acc
    ),
    [0, 0, 0],
  )
  .slice(0, 2)
  .reduce((acc, cur) => acc * cur, 1)
console.log(part2)
