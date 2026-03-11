import { Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';

import { ORDER_TIMELINE_STEPS } from '../../../constants/orderTracking';
import { AppCard } from '../../ui/AppCard';

type OrderTimelineProps = {
  activeStep: number;
};

export function OrderTimeline({ activeStep }: OrderTimelineProps): JSX.Element {
  return (
    <AppCard sx={{ p: { xs: 2.5, md: 3 } }}>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        Статус заказа
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical">
        {ORDER_TIMELINE_STEPS.map((step) => (
          <Step key={step.title} expanded>
            <StepLabel>
              <Typography variant="subtitle2">{step.title}</Typography>
            </StepLabel>
            <StepContent sx={{ pb: 1.5 }}>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </AppCard>
  );
}
