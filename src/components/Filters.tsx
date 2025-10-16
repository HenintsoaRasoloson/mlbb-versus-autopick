import { useState } from "react";
import styled from "styled-components";
import type { Role } from "../types/Hero";

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem;
  flex-wrap: wrap;
`;

const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: white;
  cursor: pointer;
`;

const roles: Role[] = [
  "Fighter",
  "Marksman",
  "Mage",
  "Assassin",
  "Tank",
  "Support",
];

interface FiltersProps {
  onFilterChange: (roles: Role[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const handleRoleChange = (role: Role) => {
    const newRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    setSelectedRoles(newRoles);
    onFilterChange(newRoles);
  };

  return (
    <FilterContainer>
      {roles.map((role) => (
        <FilterCheckbox key={role}>
          <input
            type="checkbox"
            checked={selectedRoles.includes(role)}
            onChange={() => handleRoleChange(role)}
          />
          {role}
        </FilterCheckbox>
      ))}
    </FilterContainer>
  );
};

export default Filters;
