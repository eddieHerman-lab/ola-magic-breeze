import random
import time
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# Simulated database of materials
materials = {
    'steel': {'name': 'Steel', 'tenacidade_fratura': 50, 'dureza': 150},
    'aluminum': {'name': 'Aluminum', 'tenacidade_fratura': 30, 'dureza': 60},
    'titanium': {'name': 'Titanium', 'tenacidade_fratura': 70, 'dureza': 200},
}

class FractureAnalyzer:
    def __init__(self):
        self.force = 0
        self.area = 0.0045  # m²
        self.material = 'steel'
        self.comprimento_trinca = 0.001  # m
        self.fator_geometrico = 1
        self.sensor_data = []

    def simulate_sensor_reading(self):
        # Simulates force sensor reading
        return random.uniform(0, 1000)  # Random force between 0 and 1000 N

    def simulate_durometer(self):
        # Simulates durometer reading
        base_dureza = materials[self.material]['dureza']
        return base_dureza + random.uniform(-10, 10)

    def calculate_k(self, force):
        tensao = force / self.area
        return self.fator_geometrico * tensao * (self.comprimento_trinca * 3.14159) ** 0.5

    def analyze(self):
        self.force = self.simulate_sensor_reading()
        dureza = self.simulate_durometer()
        k = self.calculate_k(self.force)
        tenacidade_fratura = materials[self.material]['tenacidade_fratura']
        
        self.sensor_data.append((self.force, k))
        
        if k >= tenacidade_fratura:
            return f"Fratura provável: K = {k:.2f} MPa·√m > Tenacidade à Fratura = {tenacidade_fratura} MPa·√m"
        else:
            return f"Fratura improvável: K = {k:.2f} MPa·√m < Tenacidade à Fratura = {tenacidade_fratura} MPa·√m"

def run_simulation(analyzer, num_steps=100):
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 10))
    line1, = ax1.plot([], [], lw=2)
    line2, = ax2.plot([], [], lw=2)
    
    ax1.set_xlim(0, num_steps)
    ax1.set_ylim(0, 1000)
    ax1.set_xlabel('Time')
    ax1.set_ylabel('Force (N)')
    
    ax2.set_xlim(0, 1000)
    ax2.set_ylim(0, 100)
    ax2.set_xlabel('Force (N)')
    ax2.set_ylabel('K (MPa·√m)')
    
    ax1.grid(True)
    ax2.grid(True)
    
    def update(frame):
        result = analyzer.analyze()
        print(result)
        
        forces, k_values = zip(*analyzer.sensor_data)
        line1.set_data(range(len(forces)), forces)
        line2.set_data(forces, k_values)
        
        ax1.relim()
        ax1.autoscale_view()
        ax2.relim()
        ax2.autoscale_view()
        
        return line1, line2

    ani = FuncAnimation(fig, update, frames=num_steps, interval=100, blit=True)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    analyzer = FractureAnalyzer()
    run_simulation(analyzer)