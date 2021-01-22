
export function extended_gcd(a: bigint, b: bigint): Array<bigint> {

    let s: bigint  = BigInt(0);
  
    let old_s: bigint = BigInt(1);
  
    let t: bigint = BigInt(1);
  
    let old_t: bigint = BigInt(0);
  
    let r: bigint = b;
  
    let  old_r: bigint = a;
  
  ​
  
    while (r !== BigInt(0)) {
  
      let quotient: bigint = ~~(old_r / r);
  
      [old_r, r] = [r, old_r - quotient * r];
  
      [old_s, s] = [s, old_s - quotient * s];
  
      [old_t, t] = [t, old_t - quotient * t];
  
    }
  
    return [old_r, old_s, old_t];
  
  }
  
  ​
export function mod_reduce(x: bigint, p: bigint): bigint {
  
    let r: bigint = x % p;
  
    return r >= 0 ? r : r + p;
  
  }
  
  ​
  
export function modular_inverse(x: bigint, p: bigint): bigint {
  
    let gcd: bigint, s: bigint, _t: bigint;
  
    [gcd, s, _t] = extended_gcd(x, p);
  
    return gcd > 0 ? s : -s;
  
  }
  
  ​
  
export function interpolate(n: bigint, t: bigint, r: Array<bigint>, p:bigint): bigint {
  
    if (BigInt(r.length) !== n) {
  
      // Return -1 instead of false to indicate differing lengths
      return BigInt(-1)
  
    }
  
    let f0 = BigInt(0);
  
    let f: bigint;
  
    for (let i = 0; i <= t; i++) {
  
      f = BigInt(1);
  
      for (let j = 0; j <= t; j++) {
  
        if (i !== j) {
  
          f *= mod_reduce((BigInt(0) - BigInt(j + 1)) * modular_inverse(BigInt(i - j), p), p);
  
        }
  
      }
  
      f0 += mod_reduce(r[i] * f, p);
  
    }
  
    return mod_reduce(f0, p);
  
  }