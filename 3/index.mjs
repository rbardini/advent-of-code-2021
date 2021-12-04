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
  .map(line => line.split('').map(Number))

const freq = arr =>
  arr.reduce(
    (acc, cur) => (
      cur.forEach((bit, i) => (acc[i] = (acc[i] ?? 0) + bit)), acc
    ),
    [],
  )

const freqFilter = (
  arr,
  val,
  i = 0,
  bit = freq(arr)[i] >= arr.length / 2 ? val : 1 - val,
) =>
  arr.length === 1
    ? arr
    : freqFilter(
        arr.filter(line => line[i] === bit),
        val,
        i + 1,
      )

const part1 = freq(input)
  .reduce((acc, cur, i) => ((acc[i] = +(cur > input.length / 2)), acc), [])
  .reduce(
    (acc, cur, i) => ((acc[0][i] = cur), (acc[1][i] = 1 - cur), acc),
    [[], []],
  )
  .map(arr => arr.join(''))
  .map(bin => parseInt(bin, 2))
  .reduce((acc, cur) => acc * cur, 1)
console.log(part1)

const part2 = [input, input]
  .map((input, i) =>
    freqFilter(input, i)
      .map(arr => arr.join(''))
      .map(bin => parseInt(bin, 2)),
  )
  .reduce((acc, cur) => acc * cur, 1)
console.log(part2)
