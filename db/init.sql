/* Инициализация БД к диплмоу */
CREATE UNLOGGED TABLE IF NOT EXISTS pakrmk (
    pakrmk_id serial NOT NULL PRIMARY KEY,
    branch_name varchar(255),
    /* Филиал */
    branch_adress varchar(255),
    /* Адрес филиала */
    cash_number varchar(255),
    /*Номер кассы (производственного участка)*/
    ipt_number varchar(255),
    /*Номер терминала банка на производственном участке*/
    pak_type varchar(255),
    /* Тип кассы (ПАК РМК или Экспресс)*/
    name_cash_master varchar(255),
    /* Начальник производственного участка*/
    index_area varchar(255),
    /*Индекс*/
    cash_master_phone_number_mobile varchar(255),
    /* Мобильный телефон начальника участка*/
    cash_master_phone_number_work varchar(255),
    /*Рабочий телефон начальника участка*/
    cash_master_email varchar(255)
    /*Почта начальника участка*/
);

