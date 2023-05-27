// the available wikis
export type TAvailableWikis = 
    'demon-slayer' |
    'dragon-ball' |
    'one-piece' |
    'shiki' |
    'naruto';

// the different formats available of pages
export type TPageFormats = 'classic' | 'table-1' | 'table-2';
/*
    classic: the classic page with the list of characters names
    table-1: the table with the image on the left
    table-2: the sorted table with the different categories
*/

/* 
    demon-slayer FR = https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages (classic)
    demon-slayer EN = https://kimetsu-no-yaiba.fandom.com/wiki/Characters (table-2)

    dragon-ball FR = https://dragonball.fandom.com/fr/wiki/Catégorie:Personnages (classic)
    dragon-ball EN = https://dragonball.fandom.com/wiki/Category:Characters (classic)

    one-piece FR = https://onepiece.fandom.com/fr/wiki/Liste_des_Personnages_Canon (table-1)
    one-piece EN = https://onepiece.fandom.com/wiki/Category:Characters (table-1)

    naruto FR = https://naruto.fandom.com/fr/wiki/Catégorie:Personnages (classic)
    naruto EN = https://naruto.fandom.com/wiki/Category:Characters (classic)
*/