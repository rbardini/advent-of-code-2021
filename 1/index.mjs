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
  .map(Number)

const part1 = input.reduce((acc, cur, i, arr) => acc + (cur > arr[i - 1]), 0)
console.log(part1)

const part2 = input
  .reduce(
    (acc, cur, i, arr) => (acc.push(cur + arr[i + 1] + arr[i + 2]), acc),
    [],
  )
  .reduce((acc, cur, i, arr) => acc + (cur > arr[i - 1]), 0)
console.log(part2)
