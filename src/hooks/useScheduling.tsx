import { useContext } from "react";

import { SchedulingContext, SchedulingContextDataProps } from '../contexts/CreateSchedulingContext'

export function useScheduling(): SchedulingContextDataProps {
  const context = useContext(SchedulingContext)

  return context;
}