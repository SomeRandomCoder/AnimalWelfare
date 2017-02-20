
CREATE TABLE IF NOT EXISTS `adoptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `animal` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `bio` varchar(250) NOT NULL,
  `image` text,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
