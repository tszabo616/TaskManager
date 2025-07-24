DROP TABLE IF EXISTS public.tasks;

CREATE TABLE IF NOT EXISTS public.tasks
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    title text COLLATE pg_catalog."default",
    due_date timestamp without time zone,
    is_completed boolean NOT NULL DEFAULT false,
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tasks
    OWNER to task_manager_admin;