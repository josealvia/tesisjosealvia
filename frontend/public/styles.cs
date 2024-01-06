nav {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.nav-title {
  font-size: 24px;
}

.nav-menu {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #333;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease-in-out;
}

.nav-menu.open {
  transform: scaleY(1);
}

.nav-menu li {
  padding: 10px 0;
  text-align: right;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}


