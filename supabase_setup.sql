-- 문의사항 저장 테이블 만들기
create table inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  grade_class text,
  message text not null,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- 보안 설정
alter table inquiries enable row level security;

-- 누구나 문의 등록(insert)은 가능하도록 허용
create policy "Anyone can insert" on inquiries
  for insert with check (true);
