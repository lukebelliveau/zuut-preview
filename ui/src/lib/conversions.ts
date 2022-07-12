import { shouldNormalizeTo3Inches } from './grid';

export function feetToMm(feet: number) {
  return feet * 304.8;
}

export function mmToFeet(mm: number) {
  return mm / 304.8;
}

const roundToNearestMultipleof3 = (x: number) => Math.round(x / 3) * 3;

export function inchesToMm(inches: number) {
  return inches * 25.4;
}

export function feetToMm_REQUIRE_3_INCHES(feet: number) {
  if (feet % 0.25 !== 0) {
    console.error('Tried to convert non-multiple of 3 to mm: ', feet);
    throw new Error('Tried to convert non-multiple of 0.25 feet to mm');
  }
  return feet * 304.8;
}

export const inchesToFeet = (inches: number) => {
  return inches / 12;
};

// round to nearest 3 inches, then return value in mm
export const normalizeMmTo3Inches = (mm: number) => {
  return inchesToMm(Math.round(mm / 76.2)) * 3;
};
