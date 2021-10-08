use gcpdb;

create table noti_tweet(
	id int not null auto_increment PRIMARY KEY,
    humano varchar(40),
    comentario varchar(300),
    fecha date,
    up int,
    down int
);

create table hashtag(
    nombre varchar(35) not null unique primary key
);

create table asignacion(
	id_noti_tweet int,
    hashtag varchar(35),
    CONSTRAINT fk_noticia FOREIGN KEY (id_noti_tweet)
        REFERENCES noti_tweet (id),
    CONSTRAINT fk_hashtag FOREIGN KEY (hashtag)
        REFERENCES hashtag (nombre),
	primary key(id_noti_tweet, hashtag)
);

select * from noti_tweet;
select * from hashtag;
select * from asignacion order by id_noti_tweet;

select id from noti_tweet order by id desc limit 1;

delete from noti_tweet where id = 1;
delete from asignacion where id_noti_tweet = 2;
truncate table noti_tweet;


drop table asignacion;
drop table hashtag;
drop table noti_tweet;


truncate table asignacion;
truncate table hashtag;
truncate table noti_tweet;