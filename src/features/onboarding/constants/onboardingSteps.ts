import { Dumbbell, Flame, Trophy } from 'lucide-react-native';
import { COLORS } from '@/shared/constants';

export const ONBOARDING_STEPS = [
  {
    id: 1,
    icon: Dumbbell,
    title: "Treinar nunca foi tão simples",
    description: "Registre seus treinos em segundos e mantenha o foco",
    color: COLORS.brand.DEFAULT,
  },
  {
    id: 2,
    icon: Flame,
    title: "Crie sua ofensiva",
    description: "Mantenha a consistência e não quebre a sequência",
    color: COLORS.brand.DEFAULT,
  },
  {
    id: 3,
    icon: Trophy,
    title: "Conquiste seus objetivos",
    description: "Acompanhe seu progresso e celebre cada vitória",
    color: COLORS.brand.DEFAULT,
  },
];
