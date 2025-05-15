// In a global.d.ts or types.ts file
declare module 'react-native-vector-icons/Ionicons' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';
  
  interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  const Icon: ComponentType<IconProps>;
  export default Icon;
}

// Then in your component
import IonIcon from 'react-native-vector-icons/Ionicons';