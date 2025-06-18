import { Truck, Check, Clock } from 'lucide-react';

const orders = [
	{
		id: 'ORD-001',
		date: '2025-06-18',
		status: 'Processing',
		items: [{ name: 'Product 1', quantity: 2, price: 99.99 }],
		total: 199.98,
		icon: Clock,
		statusColor: 'text-yellow-600 bg-yellow-100',
	},
	{
		id: 'ORD-002',
		date: '2025-06-17',
		status: 'Shipped',
		items: [{ name: 'Product 2', quantity: 1, price: 149.99 }],
		total: 149.99,
		icon: Truck,
		statusColor: 'text-blue-600 bg-blue-100',
	},
	{
		id: 'ORD-003',
		date: '2025-06-16',
		status: 'Delivered',
		items: [{ name: 'Product 3', quantity: 3, price: 79.99 }],
		total: 239.97,
		icon: Check,
		statusColor: 'text-green-600 bg-green-100',
	},
];

export default function OrdersPage() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
			</div>

			<div className="space-y-6">
				{orders.map((order) => {
					const Icon = order.icon;
					return (
						<div key={order.id} className="bg-white rounded-lg shadow-md p-6">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-4">
									<div className={`p-2 rounded-full ${order.statusColor}`}>
										<Icon size={24} />
									</div>
									<div>
										<h2 className="text-lg font-semibold text-gray-900">
											Order {order.id}
										</h2>
										<p className="text-sm text-gray-500">
											Placed on {order.date}
										</p>
									</div>
								</div>
								<div
									className={`px-4 py-2 rounded-full text-sm font-medium ${order.statusColor}`}
								>
									{order.status}
								</div>
							</div>

							<div className="border-t border-gray-200 pt-4">
								{order.items.map((item, index) => (
									<div
										key={index}
										className="flex justify-between items-center py-2"
									>
										<div>
											<p className="text-gray-900">{item.name}</p>
											<p className="text-sm text-gray-500">
												Quantity: {item.quantity}
											</p>
										</div>
										<p className="text-gray-900">
											${item.price.toFixed(2)}
										</p>
									</div>
								))}
								<div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
									<p className="font-semibold text-gray-900">Total</p>
									<p className="font-semibold text-gray-900">
										${order.total.toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
