import { shouldNormalizeTo3Inches } from './grid';

export function feetToMm(feet: number) {
  return feet * 304.8;
}

export function mmToFeet(mm: number) {
  return mm / 304.8;
}

export function inchesToMm(inches: number) {
  return inches * 25.4;
}

// round to nearest 3 inches, then return value in mm
export const normalizeMmTo3InchesIfEnabled = (mm: number) => {
  return shouldNormalizeTo3Inches ? inchesToMm(Math.round(mm / 76.2)) * 3 : mm;
};
