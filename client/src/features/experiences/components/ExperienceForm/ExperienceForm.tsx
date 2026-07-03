import type { ExperienceFormValues } from '@/features/experiences/types';
import { useForm } from 'react-hook-form';

const inputClassName =
  'mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white';

const textareaClassName =
  'mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white';

const disabledInputClassName =
  'mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-100 px-4 text-zinc-500 outline-none cursor-not-allowed';

const errorClassName = 'mt-2 text-sm text-red-600';

export function ExperienceForm({ fixedCompanyName }: { fixedCompanyName?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    defaultValues: {
      companyName: '',
      position: '',
      type: 'other',
      content: '',
      isAnonymous: true,
    },
  });

  function onSubmit(values: ExperienceFormValues) {
    console.log(values);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
    >
      <div>
        <label className="text-sm font-medium text-zinc-800">Şirket adı</label>
        {fixedCompanyName ? (
          <input
            {...register('companyName')}
            value={fixedCompanyName}
            readOnly
            className={disabledInputClassName}
          />
        ) : (
          <>
            <input
              {...register('companyName', { required: 'Şirket adı zorunludur' })}
              placeholder="Örn. Trendyol"
              className={inputClassName}
            />
            {errors.companyName && <p className={errorClassName}>{errors.companyName.message}</p>}
          </>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-800">Pozisyon</label>
        <input
          {...register('position', { required: 'Pozisyon zorunludur' })}
          placeholder="Örn. Satış uzmanı, frontend developer, mimar..."
          className={inputClassName}
        />
        {errors.position && <p className={errorClassName}>{errors.position.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-800">Deneyim türü</label>

        <div className="relative mt-2">
          <select
            {...register('type')}
            className="h-12 w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 pr-12 text-zinc-950 outline-none transition focus:border-zinc-400 focus:bg-white"
          >
            <option value="interview">Mülakat</option>
            <option value="work">Çalışma deneyimi</option>
            <option value="internship">Staj</option>
            <option value="other">Diğer</option>
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
            ↓
          </span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-800">Deneyimin</label>
        <textarea
          {...register('content', {
            required: 'Deneyim alanı zorunlu.',
            minLength: {
              value: 20,
              message: 'Deneyim en az 20 karakter olmalı.',
            },
          })}
          rows={7}
          placeholder="Süreç nasıldı, neler soruldu, çalışma ortamı nasıldı?"
          className={textareaClassName}
        />
        {errors.content && <p className={errorClassName}>{errors.content.message}</p>}
      </div>

      <label className="flex items-center gap-3 text-sm text-zinc-700">
        <input type="checkbox" {...register('isAnonymous')} />
        Anonim paylaş
      </label>

      <div className="flex justify-end">
        <button className="h-12 rounded-2xl bg-zinc-950 px-6 font-medium text-white transition hover:bg-zinc-800">
          Yayınla
        </button>
      </div>
    </form>
  );
}
