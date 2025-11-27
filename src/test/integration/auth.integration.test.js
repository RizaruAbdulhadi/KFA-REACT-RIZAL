import { describe, it, expect } from "vitest";

describe(`tambah`, () => {
  let a = 2;
  let b = 3;

  function tambah(x, y) {
    return x + y;
  }
  it("menambabhkan dua angka dengan benar", () => {
    let hasil = tambah(a, b);

    expect(hasil).toBe(5);
  });
});
