-- MySQL Script generated by MySQL Workbench
-- Fri Jul 22 11:15:36 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema shoppingCartApp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shoppingCartApp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shoppingCartApp` DEFAULT CHARACTER SET utf8 ;
USE `shoppingCartApp` ;

-- -----------------------------------------------------
-- Table `shoppingCartApp`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoppingCartApp`.`Product` (
  `ID` INT NOT NULL,
  `productName` VARCHAR(45) NOT NULL,
  `productType` VARCHAR(45) NOT NULL,
  `useAmountPerDay` INT NULL,
  `calories` FLOAT NULL,
  `sizeInKG` FLOAT NULL,
  `priceOfProduct` FLOAT NULL,
  `boughtDate` DATETIME NOT NULL,
  `lastUseData` DATETIME NOT NULL,
  `selected` TINYINT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `productType_UNIQUE` (`productType` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shoppingCartApp`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoppingCartApp`.`Users` (
  `ID` INT GENERATED ALWAYS AS () VIRTUAL,
  `userName` VARCHAR(45) NOT NULL COMMENT 'Must have at least one character',
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `token` VARCHAR(265) GENERATED ALWAYS AS () VIRTUAL,
  `Product_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `Tokencol_UNIQUE` (`token` ASC) VISIBLE,
  INDEX `fk_Users_Product_idx` (`Product_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Users_Product`
    FOREIGN KEY (`Product_ID`)
    REFERENCES `shoppingCartApp`.`Product` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
