-- Deutsch mit Plan — sincronização por conta (rodar uma vez no SQL Editor do Supabase)
-- Uma linha por aparelho de cada conta. Cada aparelho grava só a própria linha
-- e lê as dos outros aparelhos DA MESMA CONTA para juntar o progresso.

create table if not exists public.sync_devices (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  device_id  text        not null check (char_length(device_id) between 3 and 64),
  name       text        not null default 'Aparelho' check (char_length(name) <= 60),
  updated_at timestamptz not null default now(),
  data       text        not null check (octet_length(data) < 15000000),
  primary key (user_id, device_id)
);

-- Segurança: ninguém sem login acessa; cada conta só enxerga e altera as próprias linhas.
alter table public.sync_devices enable row level security;
revoke all on public.sync_devices from anon;
grant select, insert, update, delete on public.sync_devices to authenticated;

drop policy if exists "sync: ler as proprias linhas" on public.sync_devices;
drop policy if exists "sync: criar as proprias linhas" on public.sync_devices;
drop policy if exists "sync: alterar as proprias linhas" on public.sync_devices;
drop policy if exists "sync: apagar as proprias linhas" on public.sync_devices;

create policy "sync: ler as proprias linhas" on public.sync_devices
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "sync: criar as proprias linhas" on public.sync_devices
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "sync: alterar as proprias linhas" on public.sync_devices
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "sync: apagar as proprias linhas" on public.sync_devices
  for delete to authenticated using ((select auth.uid()) = user_id);
