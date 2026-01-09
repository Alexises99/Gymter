import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DayCard } from '../app/(protected)/home/components/DayCard'

const meta = {
  title: 'Components/DayCard',
  component: DayCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'selected', 'disabled']
    },
    handleClick: { action: 'clicked' }
  },
  args: {
    date: new Date(),
    variant: 'default'
  }
} satisfies Meta<typeof DayCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = {
  args: {
    variant: 'selected'
  }
}

export const Disabled: Story = {
  args: {
    variant: 'disabled'
  }
}
