'use client';

import PhoneInput from './PhoneInput';
import DateTimePicker from './DateTimePicker';
import LocationInput from './LocationInput';
import CostInput from './CostInput';
import ModuleManager from './ModuleManager';
import ModuleInputs from './ModuleInputs';
import CustomizeSection from './CustomizeSection';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { apiClient } from '@/lib/api/client';
import { eventFormSchema, EventFormData } from '@/lib/validations/event';
import { selectedModulesAtom, eventDataAtom } from '@/lib/store/atoms';

export default function EventForm() {
  const selectedModules = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(selectedModulesAtom);
  const eventData = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(eventDataAtom);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      location: '',
      cost: '',
      description: '',
    },
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      const response = await apiClient.createEvent({
        ...data,
        dateTime: data.dateTime?.toISOString(),
        modules: selectedModules,
        flyerImage: eventData.flyerImage,
        backgroundImage: eventData.backgroundImage,
      });

      console.log('Event created:', response.data);
      alert('Event created successfully!');
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
      <h2 className="text-white/85 text-[44px] font-bold mb-4 leading-tight">
        Name your event
      </h2>

      <PhoneInput
        control={control}
        name="phoneNumber"
        error={errors.phoneNumber?.message}
      />

      <div className="bg-[#6A5A7A]/65 backdrop-blur-sm rounded-[18px] p-0 shadow-lg relative z-40">
        <DateTimePicker
          control={control}
          name="dateTime"
          error={errors.dateTime?.message}
        />
        {errors.dateTime && (
          <p className="text-red-400 text-xs px-4 pb-2 animate-in fade-in slide-in-from-top-1">
            {errors.dateTime.message}
          </p>
        )}

        <Controller
          name="location"
          control={control}
          render={({ field }) => <LocationInput {...field} />}
        />
        {errors.location && (
          <p className="text-red-400 text-xs px-4 pb-2 animate-in fade-in slide-in-from-top-1">
            {errors.location.message}
          </p>
        )}

        <Controller
          name="cost"
          control={control}
          render={({ field }) => <CostInput {...field} />}
        />
        {errors.cost && (
          <p className="text-red-400 text-xs px-4 pb-2 animate-in fade-in slide-in-from-top-1">
            {errors.cost.message}
          </p>
        )}
      </div>

      <div className="relative">
        <textarea
          {...register('description')}
          placeholder="Describe your event"
          className="w-full bg-[#6A5A7A]/65 backdrop-blur-sm rounded-[18px] p-4 text-white placeholder-white/45 outline-none text-[14px] resize-none h-[85px] shadow-lg relative z-10"
        />
        {errors.description && (
          <p className="text-red-400 text-xs px-4 pt-1 animate-in fade-in slide-in-from-top-1">
            {errors.description.message}
          </p>
        )}
        <div className="text-white/35 text-xs px-4 pt-1">
          {watch('description')?.length || 0}/500
        </div>
      </div>

      <ModuleManager />

      <ModuleInputs />

      <CustomizeSection />

      <button
        type="submit"
        className="w-full bg-[#7A6A9A]/50 backdrop-blur-sm rounded-[24px] py-5 px-6 text-[#4ADE80] font-bold text-[17px] flex items-center justify-center gap-2 hover:bg-[#7A6A9A]/60 transition-all relative overflow-hidden group shadow-lg z-10"
      >
        <span>🎉</span>
        Go live
      </button>
    </form>
  );
}