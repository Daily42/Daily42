SET foreign_key_checks = 0; 

delete from event_type;
insert into event_type(id, title, color) values
(1, "42seoul_official", "FF0000")
,(2, "study group", "00FF00")
,(3, "club(동아리)", "00FFFF")
,(4, "hackerthon & conference", "FF00FF")
,(5, "etc", "FFFF00")
;

delete from location;
insert into location(code, parentCode, title, sort) values
("PL0000", null, "개포 클러스터", 1)
,("PL0100", null, "서초 클러스터", 2)
,("PL0200", null, "기타", 3)
,("PL0016", "PL0000", "지하 오픈스튜디오 어셈블리", 11)
,("PL0013", "PL0000", "1층 오픈클러스터", 21)
,("PL0014", "PL0000", "1층 게임장", 22)
,("PL0015", "PL0000", "1층 42Lab", 23)
,("PL0001", "PL0000", "2층 Cluster 01", 31)
,("PL0002", "PL0000", "2층 Cluster 02", 32)
,("PL0011", "PL0000", "3층 ClusterX 01", 41)
,("PL0012", "PL0000", "3층 ClusterX 02", 42)
,("PL0003", "PL0000", "4층 Cluster 03", 51)
,("PL0004", "PL0000", "4층 Cluster 04", 52)
,("PL0005", "PL0000", "5층 Cluster 05", 61)
,("PL0006", "PL0000", "5층 Cluster 06", 62)
,("PL0107", "PL0100", "4층 Cluster 07", 101)
,("PL0112", "PL0100", "4층 주피터 회의실", 102)
,("PL0108", "PL0100", "4층 Cluster 08", 103)
,("PL0109", "PL0100", "5층 Cluster 09", 111)
,("PL0110", "PL0100", "5층 Cluster 10", 112)
;

SET foreign_key_checks = 1; 
