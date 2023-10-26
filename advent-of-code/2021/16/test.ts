import { part1, part2 } from './solve.ts';
import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';

Deno.test('part1 - binary literal', () => {
  const input = `110100101111111000101000`;
  assertEquals(part1(input, true), 6);
});

Deno.test('part1 - operator 1', () => {
  const input = `00111000000000000110111101000101001010010001001000000000`;
  assertEquals(part1(input, true), 9);
});

Deno.test('part1 - operator 2', () => {
  const input = `11101110000000001101010000001100100000100011000001100000`;
  assertEquals(part1(input, true), 14);
});

Deno.test('part1 - 1', () => {
  const input = `8A004A801A8002F478`;
  assertEquals(part1(input), 16);
});

Deno.test('part1 - 2', () => {
  const input = `620080001611562C8802118E34`;
  assertEquals(part1(input), 12);
});

Deno.test('part1 - 3', () => {
  const input = `C0015000016115A2E0802F182340`;
  assertEquals(part1(input), 23);
});

Deno.test('part1 - 4', () => {
  const input = `A0016C880162017C3686B18A3D4780`;
  assertEquals(part1(input), 31);
});

Deno.test('part2 - 1', () => {
  const input = `C200B40A82`;
  assertEquals(part2(input), 3);
});

Deno.test('part2 - 2', () => {
  const input = `04005AC33890`;
  assertEquals(part2(input), 54);
});

Deno.test('part2 - 3', () => {
  const input = `880086C3E88112`;
  assertEquals(part2(input), 7);
});

Deno.test('part2 - 4', () => {
  const input = `CE00C43D881120`;
  assertEquals(part2(input), 9);
});

Deno.test('part2 - 5', () => {
  const input = `D8005AC2A8F0`;
  assertEquals(part2(input), 1);
});

Deno.test('part2 - 6', () => {
  const input = `F600BC2D8F`;
  assertEquals(part2(input), 0);
});

Deno.test('part2 - 7', () => {
  const input = `9C005AC2F8F0`;
  assertEquals(part2(input), 0);
});

Deno.test('part2 - 8', () => {
  const input = `9C0141080250320F1802104A08`;
  assertEquals(part2(input), 1);
});
