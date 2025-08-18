class OrdersController < ApplicationController
  before_action :authorize
  before_action :set_order, only: [:show, :update, :destroy]
  before_action :require_admin, only: [:update, :get_all_orders, :destroy]

  ORDER_ITEM_TREE = ['order_items', 'order_items.book', 'user'].freeze

  def index
    @orders = current_user.orders.includes(order_items: :book, user: :role)
    render json: @orders, include: ORDER_ITEM_TREE
  end

  def get_all_orders
    @orders = Order.includes(order_items: :book, user: :role)
    render json: @orders, include: ORDER_ITEM_TREE
  end

  def show
    if current_user.role.name != "admin" && @order.user != current_user
      return render json: { error: "Not authorized" }, status: :forbidden
    end

    render json: @order, include: ORDER_ITEM_TREE
  end

  def create
    cart = current_user.cart
    if cart.cart_items.empty?
      return render json: { error: "Cart is empty" }, status: :unprocessable_entity
    end

    order = current_user.orders.create!(status: "pending")

    cart.cart_items.find_each do |item|
      order.order_items.create!(
        book: item.book,
        quantity: item.quantity,
        price: item.book.price
      )
    end

    cart.cart_items.destroy_all

    order = Order.includes(order_items: :book, user: :role).find(order.id)

    render json: order, include: ORDER_ITEM_TREE, status: :created
  end

  def update
    if @order.update(order_params)
      render json: @order, status: :ok
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    @order.destroy
    head :no_content
  end

  private

  def set_order
    scope = current_user.role.name == "admin" ? Order : current_user.orders
    @order = scope.includes(order_items: :book, user: :role).find(params[:id])
  end

  def order_params
    params.permit(:status)
  end

  def require_admin
    unless current_user&.role&.name == "admin"
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end
end
