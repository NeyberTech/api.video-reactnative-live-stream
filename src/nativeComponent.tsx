import {
  requireNativeComponent,
} from 'react-native';

import type { NativeLivestreamProps } from './types'

export interface RefNativeView extends NativeLivestreamProps {
  setNativeProps(nativeProps: Partial<NativeLivestreamProps>): void;
}

export const NativeLivestreamView =
  requireNativeComponent<NativeLivestreamProps>('ReactNativeLivestreamView');
