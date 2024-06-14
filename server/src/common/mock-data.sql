-- CREATE TABLE IF NOT EXISTS User (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   hash VARCHAR(255) NOT NULL,
--   salt VARCHAR(255) NOT NULL,
--   role ENUM('ADMIN', 'USER', 'CHEF') NOT NULL DEFAULT 'USER' -- Default role to USER
-- );
-- 


INSERT INTO User (name, email, hash, salt) VALUES 
 ('Admin_1', 'admin_1@admin.com', 'f0993bc25874938270e5a6037bd6e423', '76f2f3556c52eeb0d574'),
 ('Chef_1', 'chef_1@chef.com', 'c830b2c95cff261a58e1f43202cc74cd', '4ddd54387aaee96a004e'),
 ('Admin_2', 'admi_2n@admin.com',  'dc09155ec9689eb6489359a8bc0640d7', '127a3d767ab59d3683ce'),
 ('Employee_1', 'employee_1@employee.com',  '3914619f74b6eab32e0f80a514b158ad', '90c67ab4533efb24421a'),
 ('Chef_2', 'chef_2@chef.com', 'ae6561d0edcb3dc510ad6e6c08763256', 'acf25eca89dafd61f316');