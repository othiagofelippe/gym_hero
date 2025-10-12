import { HStack } from '@/shared/components/ui/hstack';
import { VStack } from '@/shared/components/ui/vstack';
import { Text } from '@/shared/components/ui/text';
import { CheckCircle2 } from 'lucide-react-native';
import { useState } from 'react';

interface WeeklyCheckInProps {
  checkedDays?: number[]; // Array com os dias da semana que foram marcados (0-6, sendo 0 = domingo)
}

const DAYS = [
  { label: 'Dom', value: 0 },
  { label: 'Seg', value: 1 },
  { label: 'Ter', value: 2 },
  { label: 'Qua', value: 3 },
  { label: 'Qui', value: 4 },
  { label: 'Sex', value: 5 },
  { label: 'Sáb', value: 6 },
];

export default function WeeklyCheckIn({ checkedDays = [] }: WeeklyCheckInProps) {
  return (
    <VStack space="md" className="p-4">
      <Text size="lg" bold className="text-text-headline">
        Ofensiva
      </Text>

      <HStack space="xs" className="justify-between">
        {DAYS.map((day) => {
          const isChecked = checkedDays.includes(day.value);

          return (
            <VStack
              key={day.value}
              space="xs"
              className="items-center flex-1"
            >
              <Text
                size="sm"
                className={isChecked ? 'text-brand font-bold' : 'text-text-span'}
              >
                {day.label}
              </Text>
              <CheckCircle2
                size={32}
                color={isChecked ? '#000000' : 'rgb(124, 124, 138)'}
                fill={isChecked ? 'rgb(249, 115, 22)' : 'transparent'}
              />
            </VStack>
          );
        })}
      </HStack>
    </VStack>
  );
}
