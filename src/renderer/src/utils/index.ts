import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

export const formatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const formatDateFromMs = (ms: number) => formatter.format(ms)

export function makeRandomColor() {
  var c = ''
  while (c.length < 7) {
    c += Math.random().toString(16).substr(-6).substr(-1)
  }
  return '#' + c
}
