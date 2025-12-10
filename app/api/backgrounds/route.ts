import { NextRequest, NextResponse } from 'next/server';

const defaultBackgrounds = [
  {
    id: 'gradient-1',
    name: 'Pink Purple Blue',
    gradient: 'from-[#E47CB8] via-[#A97CE4] to-[#5CB4E4]',
  },
  {
    id: 'gradient-2',
    name: 'Pink Purple Light Blue',
    gradient: 'from-[#FF6B9D] via-[#C76BFF] to-[#6BB6FF]',
  },
  {
    id: 'gradient-3',
    name: 'Coral Purple Cyan',
    gradient: 'from-[#FFA07A] via-[#DDA0FF] to-[#7ACBFF]',
  },
  {
    id: 'gradient-4',
    name: 'Rose Purple Sky',
    gradient: 'from-[#FF8C94] via-[#B88CFF] to-[#8CC4FF]',
  },
];

export async function GET() {
  return NextResponse.json({
    data: defaultBackgrounds,
  });
}