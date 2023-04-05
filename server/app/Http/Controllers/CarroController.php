<?php

namespace App\Http\Controllers;

use App\Form\FormValidation;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Carro;
use Illuminate\Support\Facades\DB;

class CarroController extends Controller
{
    private array $rules = [
        'modelo' => 'required',
        'fabricante' => 'required',
        'ano' => 'required',
        'preco' => 'required'
    ];

    public function index()
    {
        try {
            $carros = Carro::all();
            if (!$carros) {
                return response()->json(['message' => 'recurso não encontrado'],404);
            }
            return response()->json($carros);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }

    public function show($id)
    {
        try {
            $carro = Carro::with('defeitos')->find($id);
            if (!$carro) {
                return response()->json(['message' => 'recurso não encontrado'],404);
            }
            return response()->json($carro);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }

    public function store(Request $request)
    {
        // cria um ponto de restauração
        DB::beginTransaction();

        try {
            $validate = FormValidation::validar($request->all(), $this->rules);

            //se houver erros de validacao, retornara uma array com a chave errors. e suas respectivas mensagens
            if ($validate !== true) {
                return $validate;
            }

            $modelo = $request->get('modelo');
            $fabricante = $request->get('fabricante');
            $ano = $request->get('ano');
            $preco = $request->get('preco');

            $carro = new Carro();
            $carro->modelo = $modelo;
            $carro->fabricante = $fabricante;
            $carro->ano = $ano;
            $carro->preco = $preco;
            $carro->save();

            //confirma operação para o banco
            DB::commit();

            return response()->json(['message' => 'Oba, deu certo!']);

        } catch (QueryException $e) {

            // volta pro ponto de restauração
            DB::rollBack();

            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }

    public function update(Request $request, $id)
    {
        // ponto de restauracao
        DB::beginTransaction();
        try {
            // verifica se existe um carro no banco com esse id
            $carro = Carro::find($id);

            if (!$carro) {
                return response()->json(['Recurso não encontrado'], 404);
            }

            // validando os dados
            $validate = FormValidation::validar($request->all(), $this->rules);

            //se houver erros de validacao, retornara uma array com a chave errors. e suas respectivas mensagens
            if ($validate !== true) {
                return $validate;
            }

            // update no banco
            $modelo = $request->get('modelo');
            $fabricante = $request->get('fabricante');
            $ano = $request->get('ano');
            $preco = $request->get('preco');

            $carro->modelo = $modelo;
            $carro->fabricante = $fabricante;
            $carro->ano = $ano;
            $carro->preco = $preco;
            $carro->save();

            // confirma operacao no banco
            DB::commit();

            return response()->json(['message' => 'Item atualizado com sucesso']);

        } catch (QueryException $e) {
            // volta para o ponto de restauracao
            DB::rollBack();

            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }

    public function delete($id)
    {
        // verifica se existe um carro no banco com esse id
        $carro = Carro::find($id);
        if (!$carro) {
            return response()->json(['message' => 'recurso não encontrado', 404]);
        }

        // cria um ponto de restauracao
        DB::beginTransaction();

        try {
            $carro->delete();

            // confirma a transacao
            DB::commit();

            return response()->json(['message' => 'item deletado com sucesso!']);
        } catch (QueryException $e) {

            // volta para o ponto de restauracao
            DB::rollBack();

            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }
}
