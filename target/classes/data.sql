-- Optional seed data for development/initial testing
USE conectauni;

INSERT INTO users (full_name, email, password_hash, salt, role) VALUES
('Admin Organizador', 'org@conectauni.edu', 'seed-hash', 'seed-salt', 'ORGANIZADOR'),
('Colaborador Exemplo', 'colab@conectauni.edu', 'seed-hash2', 'seed-salt2', 'COLABORADOR'),
('Participante Exemplo', 'part@conectauni.edu', 'seed-hash3', 'seed-salt3', 'PARTICIPANTE');

-- Example event (creator_id WILL need to match real inserted user id after insertion)
-- INSERT INTO events (title, description, start_at, end_at, location, budget, creator_id)
-- VALUES ('Evento Exemplo', 'Descrição exemplo', '2026-01-10 10:00:00', '2026-01-10 12:00:00', 'Sala 101', 500.0, 1);
