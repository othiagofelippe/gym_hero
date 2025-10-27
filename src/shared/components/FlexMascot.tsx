import { Image, ImageStyle } from 'react-native';

type FlexPose =
  | 'neutral-standing'
  | 'holding-dumbbell'
  | 'bicep-curl'
  | 'squat'
  | 'running'
  | 'celebrating'
  | 'pointing-forward'
  | 'thumbs-up'
  | 'meditating'
  | 'sleeping';

type FlexExpression =
  | 'happy-smiling'
  | 'sad-disappointed'
  | 'determined-focused'
  | 'animated-excited'
  | 'mischievous-smirk'
  | 'tired-exhausted';

type FlexSpecial =
  | 'with-medal'
  | 'holding-water-bottle';

type FlexImage = FlexPose | FlexExpression | FlexSpecial;

interface FlexMascotProps {
  variant: FlexImage;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  style?: ImageStyle;
}

const FLEX_IMAGES: Record<FlexImage, any> = {
  'neutral-standing': require('@/assets/mascot/flex/body-poses/neutral-standing.png'),
  'holding-dumbbell': require('@/assets/mascot/flex/body-poses/holding-dumbbell.png'),
  'bicep-curl': require('@/assets/mascot/flex/body-poses/bicep-curl.png'),
  'squat': require('@/assets/mascot/flex/body-poses/squat.png'),
  'running': require('@/assets/mascot/flex/body-poses/running.png'),
  'celebrating': require('@/assets/mascot/flex/body-poses/celebrating.png'),
  'pointing-forward': require('@/assets/mascot/flex/body-poses/pointing-forward.png'),
  'thumbs-up': require('@/assets/mascot/flex/body-poses/thumbs-up.png'),
  'meditating': require('@/assets/mascot/flex/body-poses/meditating.png'),
  'sleeping': require('@/assets/mascot/flex/body-poses/sleeping.png'),
  'happy-smiling': require('@/assets/mascot/flex/facial-expressions/happy-smiling.png'),
  'sad-disappointed': require('@/assets/mascot/flex/facial-expressions/sad-disappointed.png'),
  'determined-focused': require('@/assets/mascot/flex/facial-expressions/determined-focused.png'),
  'animated-excited': require('@/assets/mascot/flex/facial-expressions/animated-excited.png'),
  'mischievous-smirk': require('@/assets/mascot/flex/facial-expressions/mischievous-smirk.png'),
  'tired-exhausted': require('@/assets/mascot/flex/facial-expressions/tired-exhausted.png'),
  'with-medal': require('@/assets/mascot/flex/special-situations/with-medal.png'),
  'holding-water-bottle': require('@/assets/mascot/flex/special-situations/holding-water-bottle.png'),
};

const SIZES = {
  small: 32,
  medium: 64,
  large: 120,
  xlarge: 200,
};

export function FlexMascot({ variant, size = 'medium', style }: FlexMascotProps) {
  const dimension = SIZES[size];

  return (
    <Image
      source={FLEX_IMAGES[variant]}
      style={[{ width: dimension, height: dimension }, style]}
      resizeMode="contain"
      alt={`Flex the Fox - ${variant}`}
    />
  );
}
