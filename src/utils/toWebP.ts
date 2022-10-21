import sharp from 'sharp';
import { IWebp } from '../types/IWebP';

export default function toWebP({ buffer, onData }: IWebp) {
  sharp(buffer, {}).webp().on('data', onData);
}
