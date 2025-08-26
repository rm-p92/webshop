class CartsController < ApplicationController
  def show
    cart = current_user.cart
    authorize! cart, to: :show?
    render json: cart, include: ['cart_items.book']
  end

  def add_item
    cart = current_user.cart
    authorize! cart, to: :update?
    item = cart.cart_items.find_or_initialize_by(book_id: params[:book_id])
    item.quantity = (item.quantity || 0) + (params[:quantity] || 1).to_i

    if item.save
      render json: cart, serializer: CartSerializer
    else
      render json: { error: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_item
    cart = current_user.cart
    authorize! cart, to: :update?
    item = cart.cart_items.find(params[:id])

    if item.update(quantity: params[:quantity])
      render json: cart, serializer: CartSerializer
    else
      render json: { error: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def remove_item
    cart = current_user.cart
    authorize! cart, to: :update?
    item = cart.cart_items.find(params[:id])
    item.destroy

    render json: cart, serializer: CartSerializer
  end
end