-- 관리자(로그인한 사용자)만 문의 목록을 보고 상태를 변경할 수 있도록 허용
create policy "Authenticated can select" on inquiries
  for select using (auth.role() = 'authenticated');

create policy "Authenticated can update" on inquiries
  for update using (auth.role() = 'authenticated');
