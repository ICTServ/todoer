import styled from 'styled-components/macro'

export const SidebarContainer = styled.div`
  position: absolute;
  top: 44px;
  left: 0;
  height: calc(100vh - 44px);
  background: var(--dark-gray);
  width: 305px;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  overflow-x: hidden;

  &.closed {
    transform: translateX(-310px);
  }
`

export const Container = styled.div`
  padding: 2rem 0 0 42px;
  transform: translateX(-12px);
`

export const SidebarButtonContainer = styled.div`
  width: 265px;
  padding: 5px 16px 5px 5px;
`

export const SidebarButton = styled.button`
  color: hsla(0, 0%, 100%, 0.87);
  border: 0;
  outline: 0;
  background: none;
  font-size: 14px;
  font-weight: 300;
  color: hsla(0, 0%, 100%, 0.87);
  text-align: left;
  width: 224px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const ProjectsButtonContainer = styled.div`
  width: 265px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  padding: 10px 16px 10px 5px;

  .dropdown {
    width: 38px;
    display: grid;
    place-content: center;
  }

  svg {
    transform: translate(0px, 0px);
    transform-origin: 50% 50%;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &.projects-closed {
      transform: rotate(-90deg);
    }
  }
`

export const ProjectsButton = styled.button`
  color: hsla(0, 0%, 100%, 0.87);
  border: 0;
  outline: 0;
  background: none;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  width: 224px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const ProjectTitles = styled.ul`
  width: 265px;
  overflow-y: hidden;
  transition: 0.3s ease-in-out;
  max-height: ${props => props.height}px;

  &.projects-closed {
    max-height: 0;
  }

  li {
    min-height: 24px;
    font-size: 14px;
    font-weight: 300;
    list-style: none;
    cursor: pointer;
    padding: 5px 16px 5px 5px;
    border-radius: 3px;
    transition: color 0.1s ease-in, background-color 0.1s ease-in;
    color: var(--text-white);
    line-height: 24px;
    margin: 0 0 0.2rem;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #363636;
    }

    &.active {
      background-color: #363636;
      font-weight: 500;

      &:hover {
        button {
          opacity: 1;
          cursor: pointer;
          display: inline;
          pointer-events: initial;
        }
      }
    }
  }
`

export const BulletPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;

  div {
    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: rgb(184, 184, 184);
      border-radius: 50%;
    }
  }
`

export const AddProjectForm = styled.form`
  padding: 5px 16px 5px 5px;
`

export const AddProjectButton = styled.button`
  background: none;
  color: var(--light-red);
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 300;
  transform: translate(-1px, 2px);
  transition: 0.2s ease-in-out;
  width: 38px;

  &:hover {
    @media (min-width: 600px) {
      color: var(--light-red);
    }
  }
`

export const AddProjectInput = styled.input`
  background: none;
  outline: 0;
  border: 0;
  padding: 5px 16px 5px 0;
  font-size: 13px;
  font-weight: 300;
  color: grey;
  transform: translateY(0px);
  transition: 0.2s ease-in-out;

  &:focus {
    border-bottom: 2px solid var(--light-red);
    color: white;
  }

  &:hover {
    @media (min-width: 600px) {
      border-bottom: 2px solid var(--light-red);
    }
  }
`
